﻿using MediatR;
using RentACar.Domain.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RentACar.Application.Locations.Queries
{
    public class GetAllLocations : IRequest<List<Location>>
    {
    }
}
