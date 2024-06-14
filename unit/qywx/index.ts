/**
 * 获取企业微信客户端的宿主信息
 */
export const getQYWXSystemInfo = () => {
	return new Promise((resolve, reject) => {
		tt.getSystemInfo({
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		});
	})
}