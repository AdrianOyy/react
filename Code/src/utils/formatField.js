import accountAPI from "../api/accountManagement"

const U = 'user'
const D = 'distribution'
const UD = 'userOrdistribution'

export default function formatField(field) {
  if (!field) return field
  const { fieldName, fieldDisplayName } = field
  if (!fieldName) return field
  let abbrFieldName = fieldDisplayName
  if (fieldDisplayName.length > 40) {
    abbrFieldName = fieldDisplayName.slice(0, 31) + ' ... '
  }
  field.abbrFieldName = abbrFieldName
  switch (fieldName) {
    case 'owneremail':
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: U }
      break
    case 'supervisoremailaccount':
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: U }
      break
    case 'distribution_list':
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: D }
      break
    case 'alternaterecipient':
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: UD }
      break
    case 'alreadyaddeddistributionlist':
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: D }
      break
    case 'emailid':
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: U }
      break
    case 'members':
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: UD }
      break
    case 'memberof':
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: D }
      break
    case 'acceptmessagesfrom':
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: UD }
      break
    case 'rejectmessagesfrom':
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: UD }
      break
    default:
      break
  }
  return field
}
