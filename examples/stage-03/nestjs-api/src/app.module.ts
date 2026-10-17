import {Module} from '@nestjs/common';
import {BooksModule} from './books.module.js';
@Module({imports:[BooksModule]})
export class AppModule {}
