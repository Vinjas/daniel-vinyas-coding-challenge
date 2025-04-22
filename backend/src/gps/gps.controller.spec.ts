import { Test, TestingModule } from "@nestjs/testing";
import { GpsController } from "./gps.controller";
import { GpsService } from "./gps.service";
import { NotFoundException } from "@nestjs/common";
import { GpsPosition } from "../database/gps-position.entity";
import { GpsSessionDto } from "./dto/gps-session.dto";

describe("GpsController", () => {
  let controller: GpsController;
  let gpsService: GpsService;

  const mockGpsPositions: GpsPosition[] = [
    {
      id: 1,
      latitude: 52.52,
      longitude: 13.405,
      timestamp: new Date("2024-10-10T08:00:00Z"),
      sessionId: "1",
    },
  ];

  const mockSession: GpsSessionDto = {
    sessionId: "1",
    startTime: 1728556800000,
    endTime: 1728557100000,
    durationMinutes: 5,
    distanceKm: 1.2,
    points: mockGpsPositions,
  };

  const mockGpsService = {
    getAllGpsPositions: jest.fn(),
    getGpsSessionData: jest.fn(),
  };

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
    gpsService = module.get<GpsService>(GpsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all GPS positions", async () => {
    mockGpsService.getAllGpsPositions.mockResolvedValue(mockGpsPositions);

    const result = await controller.getAllGpsPositions();

    expect(result).toEqual(mockGpsPositions);
    expect(mockGpsService.getAllGpsPositions).toHaveBeenCalled();
  });

  it("should return session data for a valid session ID", async () => {
    mockGpsService.getGpsSessionData.mockResolvedValue(mockSession);

    const result = await controller.getGpsPositionsById("1");

    expect(result).toEqual(mockSession);
    expect(mockGpsService.getGpsSessionData).toHaveBeenCalledWith("1");
  });

  it("should throw NotFoundException if session is not found", async () => {
    mockGpsService.getGpsSessionData.mockResolvedValue(null);

    await expect(controller.getGpsPositionsById("999")).rejects.toThrow(
      NotFoundException,
    );

    expect(mockGpsService.getGpsSessionData).toHaveBeenCalledWith("999");
  });
});
