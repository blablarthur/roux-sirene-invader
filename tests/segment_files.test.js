import { segment_file } from '../segment_file.js'

const TEST_FILE_PATH = '/home/arthur/workspace/EPITA/roux-sirene-invader/tests/testFiles/';
describe('My Segmentation File Method', () => {
  test('Read a file from a filePath', () => {
    expect(segment_file(TEST_FILE_PATH + 'test.txt')).toEqual("")
  });
  test.todo('Divide file into smaller files', () => {
    expect(segment_file(TEST_FILE_PATH + 'test.txt')).toEqual("")
  });
});

describe('My Segmentation File Method dont work when', () => {
  test('filePath is not given', () => {
      expect(() => {
        segment_file();
      }).toThrow('filePath is not correct.');
    });
  test('filePath is not a string', () => {
    expect(() => {
      segment_file(1234);
    }).toThrow('filePath is not correct.');
  });
  test("filePath don't exist", () => {
    expect(() => {
      segment_file("./bblablabablab");
    }).toThrow("filePath don't exist.");
  });
});

