import { Test, TestingModule } from '@nestjs/testing';
import { GpsController } from './gps.controller';
import { GpsService } from './gps.service';
import { GpsPosition } from '../database/gps-position.entity';
import { NotFoundException } from '@nestjs/common';

describe('GpsController', () => {
  let controller: GpsController;
  let service: GpsService;

  const mockGpsService = {
    getAllGpsPositions: jest.fn(),
    getGpsPositionsById: jest.fn(),
  };

  const mockGpsData: GpsPosition[] = [
    {
      id: 1,
      latitude: 52.52,
      longitude: 13.405,
      timestamp: new Date('2023-10-10T10:00:00Z'),
      sessionId: '1',
    },
    {
      id: 2,
      latitude: 52.53,
      longitude: 13.406,
      timestamp: new Date('2023-10-10T10:05:00Z'),
      sessionId: '2',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GpsController],
      providers: [
        {
          provide: GpsService,
          useValue: mockGpsService,
        },
      ],
    }).compile();

    controller = module.get<GpsController>(GpsController);
    service = module.get<GpsService>(GpsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all GPS positions', async () => {
    mockGpsService.getAllGpsPositions.mockResolvedValue(mockGpsData);

    const result = await controller.getAllGpsPositions();

    expect(result).toEqual(mockGpsData);
    expect(mockGpsService.getAllGpsPositions).toHaveBeenCalled();
  });

  it('should return GPS positions by session ID', async () => {
    mockGpsService.getGpsPositionsById.mockImplementation(async (sessionId: string) => {
      const result = mockGpsData.filter(pos => pos.sessionId === sessionId);
      return result.length > 0 ? result : null;
    });

    const result = await controller.getGpsPositionsById('1');

    expect(result).toEqual([mockGpsData[0]]);
    expect(mockGpsService.getGpsPositionsById).toHaveBeenCalledWith('1');
  });


  it('should throw NotFoundException if no data for session ID', async () => {
    mockGpsService.getGpsPositionsById.mockResolvedValue(null);

    await expect(controller.getGpsPositionsById('99')).rejects.toThrow(
      NotFoundException,
    );
  });
});
