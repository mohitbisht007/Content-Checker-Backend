import * as cheerio from 'cheerio'
import axios from "axios"

export const fetchTitle = async (url) => {
    try {
        const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml",
      },
    })
        const data = cheerio.load(response.data)
        const title = data("title").text().trim()

        return title || "No Title"
    } catch (error) {
        console.log(error.message)
        return "Not Title Fetched"
    }
}