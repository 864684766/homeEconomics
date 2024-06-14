/**
 * 获取飞书客户端的宿主信息
 */
export const getFsSystemInfo = () => {
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