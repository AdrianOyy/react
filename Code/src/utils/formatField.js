import accountAPI from "../api/accountManagement"

export default function formatField(field) {
  if (!field) return field
  const { fieldName } = field
  if (!fieldName) return field
  switch (fieldName) {
    case 'supervisoremailaccount':
      field.type = 'inputCheck'
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: 'user' }
      break
    default:
      break
  }
  return field
}
