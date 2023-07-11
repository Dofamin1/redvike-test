import csvService, { CSVService } from '../../../service';

export class CsvController {
  constructor(private readonly csvService: CSVService) {
    this.csvService = csvService;
  }

  parseCSV = async (req, res): Promise<any[]> => {
    const file = await req.file()

    const parsedData: any[] = await this.csvService.parseCSV(file);

    return res.send(parsedData);
  };
}

export default new CsvController(csvService);
