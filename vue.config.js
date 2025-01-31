module.exports = {
  pages: {
    navbar: {
      entry: 'src/pages/Navbar/main.js',
      template: 'public/navbar.html',
      filename: 'navbar.html',
      title: 'Navbar'
    },
    footer: {
      entry: 'src/pages/Footer/main.js',
      template: 'public/footer.html',
      filename: 'footer.html',
      title: 'Footer'
    },
    /* banner: {
      entry: './src/pages/Banner/main.js',
      template: 'public/banner.html',
      filename: 'banner.html',
      title: 'Banner'
    }, */
    /* nav: {
      entry: './src/pages/Navigation/main.js',
      template: 'public/nav.html',
      filename: 'nav.html',
      tiitle: 'Nav'
    }, */
    announcements: {
      entry: './src/pages/Announcements/main.js',
      template: 'public/announcements.html',
      filename: 'announcements.html',
      tiitle: 'Announcements'
    },
    alerts: {
      entry: './src/pages/Alerts/main.js',
      template: 'public/alerts.html',
      filename: 'alerts.html',
      tiitle: 'Alerts'
    }
  },
  assetsDir: 'static',
  publicPath: '/wc/surinhd/td/private/techrigor/SiteAssets/html/layout/',
  // publicPath: './',
  filenameHashing: false,
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  },
  outputDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined
}
