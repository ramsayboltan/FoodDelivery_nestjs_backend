import { ModesService } from './modes.service';
import { createModeDto, PagingQueryDto, ModeUpdateDto } from './modes.dto';
export declare class ModesController {
    private modeService;
    private readonly logger;
    constructor(modeService: ModesService);
    createMode(model: createModeDto): Promise<import("../../models/modes.schema").Mode>;
    getAllMode(query: PagingQueryDto): Promise<import("../../models/modes.schema").Mode[] | import("rxjs").Observable<import("../../models/modes.schema").Mode[]>>;
    getById(id: string): Promise<import("../../models/modes.schema").Mode[]>;
    updateMode(id: string, model: ModeUpdateDto): Promise<import("../../models/modes.schema").Mode | import("rxjs").Observable<import("../../models/modes.schema").Mode>>;
    deleteMode(id: string): Promise<string>;
}
