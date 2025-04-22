// DTO for the creation of the Gps Position that will be stored in the database
// As the ID for the entity will be auto generated with @PrimaryGeneratedColumn(), it is cleaner to create a dedicated DTO for this
export class CreateGpsPositionDto {
    latitude!: number;
    longitude!: number;
    timestamp!: Date;
    sessionId!: string;
}
