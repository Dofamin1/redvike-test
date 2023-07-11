import csv from 'csv-parser';
import { MultipartFile } from '@fastify/multipart';

export class CSVService {
  async parseCSV(file: MultipartFile): Promise<any[]> {
    const result: any[] = [];

    await new Promise((res, rej) => {
      file.file.pipe(csv({ separator: ';' }))
          .on('data', (data: any) => result.push(data))
          .on('end', () => res(result))
          .on('error', (e: Error) => rej(e));
    });

    return result;
  }
}

export default new CSVService();
