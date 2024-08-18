import axios from "axios"

export const getTransactionCount = async (walletAddress) => {
  try {
    const url = `https://api.arbiscan.io/api?module=account&action=tokentx&address=${walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=TYR6IY3I72TB5FIQMTCG6NNTJN7KR156MH`
    console.log(url)
    const response = await axios.get(url)

    if (response.data.status === "1") {
      const transactions = response.data.result
      const reward = await getRewardRange(transactions.length)
      return [true, transactions.length, reward]
    } else {
      if (response.data.message === "No transactions found") {
        return [true, 0, 0]
      }
      console.error("Error fetching transactions:", response.data.result)
      return [false, response.data.result, 0]
    }
  } catch (error) {
    console.error("Error:", error)
    return [false, error.message, reward]
  }
}

export const getRewardRange = async (transactionCount) => {
  if (transactionCount == 0) {
    return 0
  } else if (transactionCount > 0 && transactionCount < 30) {
    return 70000
  } else if (transactionCount >= 30 && transactionCount < 60) {
    return 350000
  } else if (transactionCount >= 60 && transactionCount < 80) {
    return 410000
  } else if (transactionCount >= 80 && transactionCount < 100) {
    return 530000
  } else if (transactionCount >= 100) {
    return 890000
  }
}
