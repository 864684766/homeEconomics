
import {
	getFsSystemInfo
} from '@/unit/feishu/index.ts'

import { getQYWXSystemInfo } from '@/unit/qywx/index.ts'

export const isMpFeiShu = async () => {
	if (!window.tt) {
		return false
	} else {
		const sysInfo : any = await getFsSystemInfo()
		if (sysInfo.appName !== 'Feishu') {
			return false
		} else {
			return true
		}
	}
}

export const isMpQywx = async () => {
	if (!window.ww) {
		return false
	} else {
		const sysInfo : any = await getQYWXSystemInfo()
		if (sysInfo.appName !== 'Feishu') {
			return false
		} else {
			return true
		}
	}
}