using Device_ManagementAPI.Devices.Features.Commands;
using Device_ManagementAPI.Devices.Features.Queries;
using Device_ManagementAPI.Dto;
using Device_ManagementAPI.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver.GeoJsonObjectModel.Serializers;

namespace Device_ManagementAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DeviceController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetAllDevicesDto>>> GetDevices()
        {
            var devices = await _mediator.Send(new GetAllDevicesQuery());

            var myDevices = devices.Select(x => new GetAllDevicesDto
            {
                Id = x.Id,
                DeviceID = x.DeviceID,
                DeviceName = x.DeviceName,
                FullName = x.DeviceName +' ' +x.Owner,
                DeviceType = x.DeviceType,
                Location = x.Location,
                Manufacturer = x.Manufacturer,
                OS = x.OS,
                Owner = x.Owner,
                Price = x.Price,
                SerialNumber = x.SerialNumber,
                Status = x.Status,
                WarrantyStatus = x.WarrantyStatus,
                PurchaseDate = x.PurchaseDate.ToShortDateString(),
                ReleaseDate = x.ReleaseDate.ToShortDateString()
            });

            return Ok(myDevices);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Device>> GetDevice(int id)
        {
            var device = await _mediator.Send(new GetDeviceByIdQuery { DeviceID = id });
            if (device == null) return NotFound();
            return Ok(device);
        }

        [HttpPost]
        public async Task<ActionResult<Device>> Create([FromBody] CreateDeviceCommand command)
        {
            var device = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetDevices), new { id = device.DeviceID }, device);
        }
   
        [HttpPut("{id}")]
        public async Task<ActionResult<Device>> UpdateDevice(int id, [FromBody] UpdateDeviceCommand command)
        {
            if (id != command.DeviceID) return BadRequest();
            var updatedDevice = await _mediator.Send(command);
            if (updatedDevice == null) return NotFound();
            return Ok(updatedDevice);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDevice(int id)
        {
            var result = await _mediator.Send(new DeleteDeviceCommand { DeviceID = id });
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
