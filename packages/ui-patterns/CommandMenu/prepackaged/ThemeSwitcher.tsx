import { useTheme } from 'next-themes'
import { useRegisterCommands } from '../api/hooks/commandsHooks'
import { useRegisterPage, useSetPage } from '../api/hooks/pagesHooks'
import { useSetCommandMenuOpen } from '../api/hooks/viewHooks'
import type { UseCommandOptions } from '../api/types'
import { PageType } from '../api/utils'
import { themes } from 'ui/src/components/ThemeProvider/themes'
import { useSetQuery } from '../api/hooks/queryHooks'

const THEME_SWITCHER_PAGE_NAME = 'switch-theme'

const useThemeSwitcherCommands = ({ options }: { options?: UseCommandOptions } = {}) => {
  const setIsOpen = useSetCommandMenuOpen()
  const setQuery = useSetQuery()
  const setPage = useSetPage()

  const { setTheme } = useTheme()

  useRegisterPage(THEME_SWITCHER_PAGE_NAME, {
    type: PageType.Commands,
    commands: [
      {
        id: 'switch-theme',
        name: 'Switch theme',
        commands: themes
          .filter(({ name }) => name === 'System' || name === 'Light' || name === 'Dark')
          .map((theme) => ({
            id: theme.name,
            name: theme.name,
            action: () => {
              setTheme(theme.value)
              setIsOpen(false)
            },
          })),
      },
    ],
  })

  useRegisterCommands(
    'Theme',
    [
      {
        id: 'switch-theme',
        name: 'Switch theme',
        action: () => {
          setPage(THEME_SWITCHER_PAGE_NAME)
          setQuery('')
        },
        defaultHidden: true,
      },
    ],
    options
  )
}

export { useThemeSwitcherCommands }
