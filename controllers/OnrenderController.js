let counter = 0

export const getCounter = async (req, res) => {
	const increaseCounter = () => {
		counter++
	}

	increaseCounter()

	res.json({ counter })
}
