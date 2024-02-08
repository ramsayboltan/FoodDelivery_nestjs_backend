import { createDriverDto, updateDriverDto, DriverFileUploadDto, PagingQueryDto, driverFilterDto } from './drivers.dto';
import { DriversService } from './drivers.service';
import { filterType } from '@app/helpers/types/driver';
export declare class DriversController {
    private driverService;
    constructor(driverService: DriversService);
    createDriver(files: filterType, body: createDriverDto): Promise<import("../../models/drivers.schema").Driver | import("rxjs").Observable<import("../../models/drivers.schema").Driver>>;
    searchDriver(searchValue: string): Promise<{
        [x: string]: any;
    }[]>;
    getAllDriver(id: string, query: PagingQueryDto): Promise<any[]>;
    getByIdDriver(id: string): Promise<{
        [x: string]: any;
    }>;
    updateDriver(id: string, model: updateDriverDto): Promise<string>;
    deleteDriver(id: string): Promise<string>;
    driverUploadProfile(id: string, files: DriverFileUploadDto): Promise<string>;
    driverFilter(query: driverFilterDto): Promise<{
        [x: string]: any;
    }[]>;
}
