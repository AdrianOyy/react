import accountAPI from "../api/accountManagement"

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
    case 'supervisoremailaccount':
      field.type = 'inputCheck'
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: 'user' }
      break
    case 'distribution_list':
      field.type = 'inputCheck'
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: 'distribution' }
      break
    case 'alternaterecipient':
      field.type = 'inputCheck'
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: 'userOrDistribution' }
      break
    case 'alreadyaddeddistributionlist':
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: 'distribution' }
      break
    case 'acceptmessagesfrom':
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: 'user' }
      break
    case 'rejectmessagesfrom':
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: 'user' }
      break
    case 'emailid':
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: 'user' }
      break
    case 'members':
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: 'user' }
      break
    case 'memberof':
      field.apiKey = accountAPI.findUsers
      field.apiValue = { returnType: 'distributions' }
      break
    default:
      break
  }
  return field
}
