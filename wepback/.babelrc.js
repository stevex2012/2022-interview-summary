module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "entry",
        corejs: "3.9.1",
        // loose:true,
        // targets: {
          // chrome: "58",
          // ie: "11",
        // },
      },
    ],
  ],
  // plugins: [    
  //   ["@babel/plugin-proposal-decorators", { legacy: true }],
  //   ["@babel/plugin-proposal-class-properties", { loose: true }],
  // ]
};
