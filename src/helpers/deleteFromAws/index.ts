import axios from 'axios'
import aws4 from 'aws4'

const instance = axios.create({
  timeout: 25000,
})

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env

export default async (url: string): Promise<unknown> => {
  const { hostname, pathname } = new URL(url)

  const signedRequest = aws4.sign(
    {
      method: 'DELETE',
      host: hostname,
      path: pathname,
      url,
    },
    {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    }
  )

  delete signedRequest.headers.Host
  delete signedRequest.headers['Content-Length']

  return instance(signedRequest)
}
