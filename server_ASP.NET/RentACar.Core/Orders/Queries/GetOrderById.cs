﻿using MediatR;
using RentACar.Domain.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentACar.Application.Orders.Queries
{
    public class GetOrderById : IRequest<Order>
    {
        public int Id { get; set; }
    }
}
