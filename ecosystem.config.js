module.exports = {
  apps: [
    {
      name: "oficina-digital-api",
      script: "node_modules/.bin/next",
      args: "start -p 3001",
      cwd: "/var/www/oficina-digital",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "/var/log/oficina-digital/error.log",
      out_file: "/var/log/oficina-digital/out.log",
    },
  ],
};
