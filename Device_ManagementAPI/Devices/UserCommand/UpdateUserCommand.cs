﻿using MediatR;

namespace Device_ManagementAPI.Devices.UserCommand
{
    public class UpdateUserCommand : IRequest<bool>
    {
        public string Id { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
    
}
