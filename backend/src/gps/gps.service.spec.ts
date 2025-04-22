import { Test, TestingModule } from '@nestjs/testing';
import { GpsService } from './gps.service';
import { GpsPosition } from '../database/gps-position.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGpsPositionDto } from './dto/create-gps-position.dto';

describe('GpsService', () => {
    let service: GpsService;
    let repository: Repository<GpsPosition>;

    const mockRepository = {
        find: jest.fn(),
        save: jest.fn(),
        create: jest.fn(),
    };

    const gpsPosition: GpsPosition = {
        id: 1,
        latitude: 52.52,
        longitude: 13.405,
        timestamp: new Date('2023-10-10T10:00:00Z'),
        sessionId: '1',
    };

    const gpsPositionDto: CreateGpsPositionDto = {
        latitude: 52.52,
        longitude: 13.405,
        timestamp: new Date('2023-10-10T10:00:00Z'),
        sessionId: '1',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GpsService,
                {
                    provide: getRepositoryToken(GpsPosition),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<GpsService>(GpsService);
        repository = module.get<Repository<GpsPosition>>(getRepositoryToken(GpsPosition));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all GPS positions', async () => {
        mockRepository.find.mockResolvedValue([gpsPosition]);

        const result = await service.getAllGpsPositions();

        expect(result).toEqual([gpsPosition]);
        expect(mockRepository.find).toHaveBeenCalled();
    });

    it('should return GPS positions by session ID', async () => {
        mockRepository.find.mockResolvedValue([gpsPosition]);

        const result = await service.getGpsPositionsById('1');

        expect(result).toEqual([gpsPosition]);
        expect(mockRepository.find).toHaveBeenCalledWith({ where: { sessionId: '1' } });
    });

    it('should save a GPS position', async () => {
        mockRepository.save.mockResolvedValue(gpsPosition);

        const result = await service.saveGpsPosition(gpsPosition);

        expect(result).toEqual(gpsPosition);
        expect(mockRepository.save).toHaveBeenCalledWith(gpsPosition);
    });

    it('should create a new GpsPosition entity from DTO', async () => {
        mockRepository.create.mockReturnValue(gpsPosition);

        const result = await service.createGpsPosition(gpsPositionDto);

        expect(result).toEqual(gpsPosition);
        expect(mockRepository.create).toHaveBeenCalledWith(gpsPositionDto);
    });
});
