import Papa from 'papaparse'

export function exportToCSV(filename: string, data: any[]) {
  const csv = Papa.unparse(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', `${filename}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToPDF(filename: string, elementId: string) {
  alert('PDF export requires Next.js Webpack configuration for node shims (jsPDF). Please use CSV export instead.')
}
