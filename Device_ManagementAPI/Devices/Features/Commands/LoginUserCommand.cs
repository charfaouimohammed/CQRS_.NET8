﻿using Device_ManagementAPI.Models;
using MediatR;

namespace Device_ManagementAPI.Devices.UserCommand
{
    public class LoginUserCommand : IRequest<User?>
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
