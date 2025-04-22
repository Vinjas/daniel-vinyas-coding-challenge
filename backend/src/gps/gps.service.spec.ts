import { Test, TestingModule } from "@nestjs/testing";
import { GpsService } from "./gps.service";
import { GpsPosition } from "../database/gps-position.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GpsSessionDto } from "./dto/gps-session.dto";

describe("GpsService", () => {
  let service: GpsService;
  let repo: Repository<GpsPosition>;

  const mockGpsPositions: GpsPosition[] = [
    {
      id: 1,
      latitude: 52.52,
      longitude: 13.405,
      timestamp: new Date("2024-10-10T08:00:00Z"),
      sessionId: "1",
    },
    {
      id: 2,
      latitude: 52.5205,
      longitude: 13.406,
      timestamp: new Date("2024-10-10T08:05:00Z"),
      sessionId: "1",
    },
  ];

  const mockRepository = {
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
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
    repo = module.get<Repository<GpsPosition>>(getRepositoryToken(GpsPosition));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all GPS positions", async () => {
    mockRepository.find.mockResolvedValue(mockGpsPositions);

    const result = await service.getAllGpsPositions();
    expect(result).toEqual(mockGpsPositions);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it("should return GPS positions by session ID", async () => {
    mockRepository.find.mockResolvedValue(mockGpsPositions);

    const result = await service.getGpsPositionsById("1");
    expect(result).toEqual(mockGpsPositions);
    expect(mockRepository.find).toHaveBeenCalledWith({
      where: { sessionId: "1" },
    });
  });

  it("should save a GPS position", async () => {
    const position = mockGpsPositions[0];
    mockRepository.save.mockResolvedValue(position);

    const result = await service.saveGpsPosition(position);
    expect(result).toEqual(position);
    expect(mockRepository.save).toHaveBeenCalledWith(position);
  });

  it("should create a new GPS position using DTO", async () => {
    const dto = {
      latitude: 52.52,
      longitude: 13.405,
      timestamp: new Date(),
      sessionId: "99",
    };
    const created = { ...dto, id: 99 };
    mockRepository.create.mockReturnValue(created);

    const result = await service.createGpsPosition(dto);
    expect(result).toEqual(created);
    expect(mockRepository.create).toHaveBeenCalledWith(dto);
  });

  it("should return a session with metadata and positions", async () => {
    mockRepository.find.mockResolvedValue(mockGpsPositions);

    const result = await service.getGpsSessionData("1");
    expect(result).toMatchObject<GpsSessionDto>({
      sessionId: "1",
      startTime: expect.any(Number),
      endTime: expect.any(Number),
      durationMinutes: 5,
      distanceKm: expect.any(Number),
      points: mockGpsPositions,
    });

    expect(result!.durationMinutes).toBeGreaterThanOrEqual(5);
    expect(result!.distanceKm).toBeGreaterThan(0);
  });

  it("should return null if session has no points", async () => {
    mockRepository.find.mockResolvedValue([]);

    const result = await service.getGpsSessionData("unknown");
    expect(result).toBeNull();
  });
});
