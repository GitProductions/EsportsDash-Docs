import { GithubIcon, TwitterIcon, YoutubeIcon } from 'lucide-react'
import { DiscordIcon } from '../../components/icons/DiscordIcon'

export const socialLinks = {
  github: {
    name: 'GitHub',
    href: 'https://github.com/GitProductions/EsportsDash-Docs',
    icon: <GithubIcon size={24} />
  },
  twitter: {
    name: 'Twitter',
    href: 'https://twitter.com/intent/user?screen_name=esportsdash_',
    icon: <TwitterIcon size={24} />
  },
  youtube: {
    name: 'YouTube',
    href: 'https://youtube.com/@Esports-Dash',
    icon: <YoutubeIcon size={24} />
  },
  discord: {
    name: 'Discord',
    href: 'https://esportsdash.com/discord',
    icon: <DiscordIcon size={24} />
  }
}