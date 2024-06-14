export const getWebPath = () => {
	const pages = getCurrentPages(); // 获取当前页面栈
	const currentPage : any = pages[pages.length - 1]; // 获取当前页面
	const url = currentPage.$page.fullPath; // 页面路由
	// 或者使用  currentPage.route currentPage.$page.fullPath 获取完整路径
	return url
}

/**
 * 获取指定长度的随机字符串
 */
export const generateRandomString = (length) => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

/**
 * 对飞书模板进行数据填充
 * @param template
 * @param data
 * @param remain_args
 * @returns
 */
export const fillTemplate = (
	template : any,
	data : any,
	remain_args : Array<string> = null
) => {
	const iter_dict = (obj : any) => {
		const new_obj = {};
		Object.keys(obj).forEach((key) => {
			if (Array.isArray(obj[key])) {
				new_obj[key] = iter_list(obj[key]);
			} else if (obj[key] && typeof obj[key] === "object") {
				new_obj[key] = iter_dict(obj[key]);
			} else if (typeof obj[key] === "string") {
				new_obj[key] = repl_string(obj[key]);
			}
		});
		return new_obj;
	};
	const iter_list = (arr : Array<any>) => {
		const new_arr = [];
		arr.forEach((ele : any) => {
			new_arr.push(iter_dict({ ele })["ele"]);
		});
		return new_arr;
	};
	const repl_string = (tpl_string : string) => {
		return tpl_string.replace(
			/\$\$\[([a-zA-Z0-9_]+)\]/g,
			(match, arg_name) => {
				const value = data[arg_name];
				if (Array.isArray(value)) {
					return value.join(",");
				} else if (value !== undefined) {
					return String(value);
				} else {
					remain_args && remain_args.push(match);
					return match;
				}
			}
		);
	};

	return iter_dict(template);
}

/**
 * 获取全路径
 */
export const getFullUrlPath = () => {
	// const url = `${window.location.origin}${window.location.pathname}`
	// const url = `http://127.0.0.1${window.location.pathname}`
	return window.location.href
}