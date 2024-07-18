import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL as string;

type ResponseData = {
  message: string
  success?: boolean
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>) {
    // Discordの特定のチャンネルにメッセージを送信する処理
    // このAPI(/api/postToDiscord)を呼び出すことで、Discordの特定のチャンネルにメッセージを送信できるようにする
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
    try {
      await axios.post(discordWebhookUrl, {
        content: 'これは定時に投稿されるメッセージです!',
      })
      res.status(200).json({ success: true, message: 'Data posted to Discord successfully' })
    } catch (error) {
      console.error('Error posting message to Discord:', error);
      res.status(500).json({error: (error as Error).message, message: 'Failed to post message'})
    }
}