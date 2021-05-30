var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }
  initPackage() {
    const pkgJson = {
      devDependencies: {
        eslint: '^3.15.0'
      },
      dependencies: {
        react: '^16.2.0'
      }
    }
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson)
    this.npmInstall()
  }
  async step1() {
    // const answers = await this.prompt([
    //   {
    //     type: 'input',
    //     name: 'name',
    //   }
    // ])
    this.fs.copyTpl(this.templatePath('t.html'), this.destinationPath('public/index.html'), { title: 'Template with yeoman' })
  }
}
