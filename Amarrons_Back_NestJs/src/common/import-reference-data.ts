import { MarkerOption } from 'src/markers/entities/marker-option.entity';
import { MarkerType } from 'src/markers/entities/marker-type.entity';
import { getConnection } from 'typeorm';
import * as XLSX from 'xlsx';

/**
 * The purpose of these function is
 * Read the ods (excel) file with some code - label (maybe more) sheet
 * Verify if the objects are in the prod DB
 * Add if one is not there
 */

/**
* TODO
* Verify if the label didn't change?
* Generic?
*/

export async function readImportReferenceDataFile() {
  const readFile = XLSX.readFile('./ImportReferenceData.ods');
  const markerTypeTable = XLSX.utils.sheet_to_json(readFile.Sheets['MarkerType']) as MarkerType[];
  const markerOptionTable = XLSX.utils.sheet_to_json(readFile.Sheets['MarkerOption']) as MarkerOption[];

  console.log(markerTypeTable);
  console.log(markerOptionTable);

  importMarkerType(markerTypeTable);
  importMarkerOption(markerOptionTable);
}

async function importMarkerType(markerTypes: MarkerType[]) {
  const repo = getConnection().getRepository(MarkerType);
  for (const e of markerTypes) {
    const markerType = await repo.findOne({ where: { code: e.code } });
    console.log(markerType);
    if (!markerType) {
      await repo.save(e);
    }
  }
}

async function importMarkerOption(markerOptions: MarkerOption[]) {
  const repo = getConnection().getRepository(MarkerOption);
  for (const e of markerOptions) {
    const markerOption = await repo.findOne({ where: { code: e.code } });
    console.log(markerOption);
    if (!markerOption) {
      await repo.save(e);
    }
  }
}