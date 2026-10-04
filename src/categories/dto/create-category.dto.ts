// model Category {
//   id        String   @id @default(uuid())
//   name      String   @unique
//   slug      String   @unique
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//
//   posts Post[]
// }

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;
}
