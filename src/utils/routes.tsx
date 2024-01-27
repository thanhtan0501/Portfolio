import Contact from '../app/(dashboard)/(pages)/contact/page'
import About from '../app/(dashboard)/(pages)/about/page'
import Home from '../app/(dashboard)/(pages)/page'
import Projects from '../app/(dashboard)/(pages)/projects/page'

export const ROUTES = [
  {
    href: '/',
    label: 'Feed',
    enabled: true,
    render: true,
    renderer: <Home />,
    active: false,
  },
  {
    href: '/about',
    label: 'About',
    enabled: true,
    render: true,
    renderer: <About />,
    active: false,
  },
  {
    href: '/projects',
    label: 'Projects',
    enabled: true,
    render: true,
    renderer: <Projects />,
    active: false,
  },

  {
    href: '/contact',
    label: 'Contact',
    enabled: true,
    render: true,
    renderer: <Contact />,
    active: false,
  },
]
