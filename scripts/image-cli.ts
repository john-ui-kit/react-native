/*
 * @Author: John
 * @Date: 2021-07-14 15:59:11
 * @LastEditors: John
 * @LastEditTime: 2021-07-30 15:49:53
 */
import fs from "fs";
import path from "path";
import { terminal as term } from "terminal-kit";
const ignoreFileList = [".git", ".vscode", "node_modules", "dist", ".DS_Store"];
/**
 * @description 初始化图片引用Index
 * @param {string} imageFilePath
 */
const initImageIndexFile = (imageFilePath: string) => {
  return new Promise<void>(async (reslove) => {
    let pngList: string[];
    try {
      pngList = fs.readdirSync(imageFilePath);
    } catch (error) {
      term("\n").eraseLineAfter.red(
        "请把图片放在模块下的/assets/images目录！❌\n"
      );
      process.exit();
    }
    pngList = pngList.filter(
      (v) => v.includes("png") && !v.includes("@2x") && !v.includes("@3x")
    );
    const pngNameList: {
      name: string;
      suffix: string;
    }[] = pngList.map((v) => ({
      name: v.split(".")[0],
      suffix: v.split(".")[1],
    }));
    const moduleName = getModuleNameList().find((v) =>
      imageFilePath.includes(v)
    );
    let variableName = moduleName
      ? `IMAGES_${moduleName?.replace("-", "").toLocaleUpperCase()}`
      : "IMAGES";
    term.green("输入对外导出的变量名:(esc取消，默认" + variableName + ")\n> ");
    const inputValue = await term.inputField({ cancelable: true }).promise;
    if (inputValue) variableName = inputValue;
    term.green("\nYour variableName is " + variableName + "\n");

    fs.writeFileSync(
      imageFilePath + "/index.ts",
      `
${pngNameList
  .map((v) => `import ${v.name} from "./${v.name}.${v.suffix}";\n`)
  .join("")}
const ${variableName} = {
  ${pngNameList.map((v) => v.name).join(",\n  ")}
};
export default ${variableName};
`
    );
    reslove();
  });
};
/**
 * @description 获取图片库路径
 * @param {string} filePath
 */
const getImagesDirList = (filePath: string) => {
  const imageFileList: string[] = [];
  //根据文件路径读取文件，返回文件列表
  //遍历读取到的文件列表
  const check = (filePath: string) => {
    fs.readdirSync(filePath)
      .filter((v) => !ignoreFileList.includes(v))
      .forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        const stats = fs.statSync(filedir);
        var isDir = stats.isDirectory(); //是文件夹
        if (isDir) {
          if (filedir.includes("images")) {
            imageFileList.push(filedir);
          }
          check(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
        }
      });
  };
  check(filePath);
  if (imageFileList.length == 0) {
    term("请把图片放在模块下的/assets/images目录！❌\n");
    process.exit();
  }
  return imageFileList;
};
/**
 * @description 获取模块名
 */
const getModuleNameList = () => {
  return fs
    .readdirSync(path.resolve(__dirname, "../src"))
    .filter((v) => !ignoreFileList.includes(v));
};

term.cyan("选择图片目录:\n");
term.singleColumnMenu(
  getImagesDirList(path.resolve(__dirname, "../src")),
  async (_error, response) => {
    await initImageIndexFile(response.selectedText);
    term("\n").eraseLineAfter.green("添加成功！🏷️\n");
    process.exit();
  }
);
