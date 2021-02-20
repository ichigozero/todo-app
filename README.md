# About
ToDo application built with Flask and React.

# Requirements
This web application has been tested in environment with
the following configuration:
- Python 3.7.3
- Node.js v12.20.1
- Nginx v1.14.2

# Installation
1. Clone this repo
2. Create Python virtual environment for Flask backend

```bash
   $ cd api
   $ python3 -m venv venv
   $ source venv/bin/activate
```

3. Install required packages for Flask backend

   ```bash
   $ pip3 install -r ../requirements.txt
   ```

4. Build react app

   ```bash
   $ cd .. && npm build
   ```

5. Create systemd service

    ```bash
    $ sudo touch /etc/systemctl/system/todo-app.service
    ```

8. Add the following into todo-app.service file.

   ```
   [Unit]
   Description=todo-app
   After=network.target

   [Service]
   User=ubuntu
   WorkingDirectory=/home/ubuntu/todo-app/api
   ExecStart=/home/ubuntu/project/todo-app/api/venv/bin/gunicorn -b 127.0.0.1:5001 api:app
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

9. Configure Nginx

   Edit `etc/nginx/sites-enabled/default`

   ```
   server {
       listen 80;

       location /todo {
           alias /home/ubuntu/todo-app/build;
           index index.html;
           try_files $uri $uri/ /todo/index.html;
       }

       location /todo/api {
           include proxy_params;
           proxy_pass http://localhost:5001;
       }
   }
   ```

10. Reload systemd and start `todo-app` service

    ```bash
    $ sudo systemctl daemon-reload
    $ sudo systemctl start todo-app
    ```

11. (Optional) Verify that `todo-app` service is running

    ```bash
    $ sudo systemctl status todo-app
    ```

12. Reload nginx

    ```bash
    $ sudo systemctl reload nginx
    ```

13. Verify that the web app is running by visiting `<IP or Host Name>/todo`
