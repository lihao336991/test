import enLocale from 'element-ui/lib/locale/lang/en'
const en = {
	login: {
		'btn': 'login',
		'title': 'BIBO Public'
	},
	datepicker: {
		'start_placeholder': 'start date',
		'end_placeholder': 'end date',
		'message': 'The amount of money received during this period',
		'timepicker': 'Screen time',
		'to': 'to',
		'money': 'yuan',
	},
	table: {
		'date': 'date',
		'name': 'name',
		'address': 'address',
		'label': 'label',
		'home': 'home',
		'company': 'company',
		'oneweek': 'recent one week',
		'onemonth': 'recent one month',
		'threemonths' : 'recent three months'
	},
	...enLocale
}
const dateTimeFormats = {
  'en-US': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
  },
  'ja-JP': {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
          year: 'numeric', month: 'short', day: 'numeric',
          weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true
    }
  }
}
export default en