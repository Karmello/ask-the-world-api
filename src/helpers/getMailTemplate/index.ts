import dict from 'src/dictionary'

type Args = {
  lang: string
  text: string
  link?: string
  btnText?: string
}

const getMailTemplate = ({ lang, text, link, btnText }: Args) => {
  const displayBtn = link && btnText

  const tags = []

  if (displayBtn) {
    tags.push(`<p>${text}</p>`)
  } else {
    tags.push(`<h3>${text}</h3>`)
  }

  if (displayBtn) {
    tags.push('<br />')
    tags.push(`
      <div>
        <a 
          href="${link}"
          target="new"
          style="
            padding: 10px 20px;
            color: black;
            text-decoration: none;
            background-color: lightblue;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          ${btnText}
        </a>
      </div>
    `)
  }

  tags.push('<br /><br /><br /><hr /><br /><br /><br />')

  tags.push(`
    <div style="text-align: center;">
      <img
        src="https://atw-fe-assets.s3.eu-central-1.amazonaws.com/logo.png"
        width="200"
      />
      <br /><br />
      <p>${dict[lang].mailFooterText}</p>
    </div>
  `)

  return `<div style="margin: 50px 25px;">${tags.join('')}</div>`
}

export default getMailTemplate
