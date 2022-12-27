import * as xlsx from 'xlsx';

export function DownloadExcel() {
  let data = [
    {
      phone: "9912345623",
      name: "Vam",
      location: "Hyd",
      email: "vam@gmail.com"
    },
    {
      phone: "9812345623",
      name: "cam",
      location: "Hyd",
      email: "cam@gmail.com"
    },
    {
      phone: "9712345623",
      name: "pam",
      location: "Hyd",
      email: "pam@gmail.com"
    },
    {
      phone: "9612345623",
      name: "sam",
      location: "Hyd",
      email: "sam@gmail.com"
    }
  ]
  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  xlsx.writeFile(workbook, "DataSheet.xlsx");
};

export default DownloadExcel;