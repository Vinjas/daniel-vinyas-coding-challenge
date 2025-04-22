import { Controller, Get, Param, NotFoundException } from "@nestjs/common";
import { GpsService } from "./gps.service";
import { GpsPosition } from "../database/gps-position.entity";
import { GpsSessionDto } from "./dto/gps-session.dto";

@Controller("gps-position")
export class GpsController {
  constructor(private readonly gpsService: GpsService) {}

  // GET /api/gps-positions- Fetch all GPS positions
  @Get()
  async getAllGpsPositions(): Promise<GpsPosition[]> {
    return await this.gpsService.getAllGpsPositions();
  }

  /**
   * API endpoint to retrieve detailed information about a GPS session.
   *
   * @param sessionId The ID of the session.
   * @returns A DTO containing session metadata and its list of GPS positions.
   * @throws NotFoundException if the session does not exist or contains no data.
   */
  @Get(":sessionId")
  async getGpsPositionsById(
    @Param("sessionId") sessionId: string,
  ): Promise<GpsSessionDto> {
    const session = await this.gpsService.getGpsSessionData(sessionId);

    if (!session || !session?.points) {
      throw new NotFoundException(
        `GPS positions with Session ID ${sessionId} not found`,
      );
    }

    return session;
  }
}
