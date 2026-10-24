# 🚀 CodeAlpha DevOps Internship - Task 1: CI/CD Pipeline Using Azure

> **Project Title:** Automated CI/CD Pipeline for a Web Application Using Azure DevOps  
> **Internship:** CodeAlpha DevOps Internship  
> **Author:** CodeAlpha DevOps Intern  
> **Platform Stack:** Node.js, Express, Docker, Azure Container Registry (ACR), Azure App Service (Linux Containers), Azure Pipelines (YAML), Jest  

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Architecture Workflow](#-architecture-workflow)
3. [Repository Directory Structure](#-repository-directory-structure)
4. [Azure Pricing & Free Tier Cost Management](#-azure-pricing--free-tier-cost-management)
5. [Prerequisites](#-prerequisites)
6. [Local Setup & Testing](#-local-setup--testing)
7. [Azure Infrastructure Setup (Step-by-Step)](#-azure-infrastructure-setup-step-by-step)
8. [Azure DevOps Configuration](#-azure-devops-configuration)
9. [Verification & Automatic Triggers](#-verification--automatic-triggers)
10. [Monitoring, Logs & Troubleshooting](#-monitoring-logs--troubleshooting)
11. [Internship Report Screenshot Checklist](#-internship-report-screenshot-checklist)
12. [Video Presentation Script](#-video-presentation-script)
13. [Clean Up / Deleting Azure Resources (Save Money)](#-clean-up--deleting-azure-resources-save-money)

---

## 🌟 Project Overview
This project demonstrates an enterprise-grade, end-to-end Automated CI/CD (Continuous Integration and Continuous Deployment) pipeline using Azure DevOps.

Every time code is committed and pushed to the `main` branch:
1. **Azure Pipelines triggers automatically**.
2. **Automated Unit & Integration tests** run via Jest to safeguard code quality.
3. If tests pass, a secure, lightweight **Docker container image** is built.
4. The container is pushed to a private **Azure Container Registry (ACR)** tagged with a unique Build ID.
5. The container image is seamlessly deployed to **Azure App Service (Linux Web App)** with zero downtime.

---

## 📐 Architecture Workflow

```
[ Developer ]
      │ (git push)
      ▼
[ GitHub / Azure Repos ]
      │ (webhook trigger)
      ▼
[ Azure Pipelines ]
      │
      ├─► Stage 1: Continuous Integration (CI)
      │     ├── Node.js 20.x setup
      │     ├── npm ci
      │     ├── npm test (Jest unit tests)
      │     └── Publish Test Results (JUnit report)
      │
      ├─► Stage 2: Containerization & Push
      │     ├── docker build -t codealpha-web-app:$(BuildId)
      │     └── docker push to Azure Container Registry (ACR)
      │
      └─► Stage 3: Continuous Deployment (CD)
            └── Deploy container to Azure App Service (Web App for Containers)
                  │
                  ▼
         [ End Users / Public Internet ] (https://<your-app>.azurewebsites.net)
```

---

## 📂 Repository Directory Structure

```
task-1/
├── .dockerignore              # Excludes unnecessary files from Docker build context
├── .gitignore                 # Prevents committing node_modules, logs, and temp files
├── Dockerfile                 # Alpine-based production container configuration
├── azure-pipelines.yml        # Multi-stage CI/CD pipeline definition
├── package.json               # Node.js dependencies and test scripts
├── package-lock.json          # Deterministic dependency lock
├── README.md                  # Complete project documentation
├── public/                    # Frontend UI assets
│   ├── index.html             # Interactive telemetry and DevOps architecture UI
│   └── style.css              # Modern dark-mode UI stylesheet
├── src/                       # Application source code
│   ├── app.js                 # Express application configuration & endpoints (/health, /api/info)
│   └── index.js               # Application server bootstrap & port binding
└── tests/                     # Automated test suites
    └── app.test.js            # Jest & Supertest automated API tests
```

---

## 💰 Azure Pricing & Free Tier Cost Management

As a beginner, it is very important to avoid surprise bills. Azure provides free options and credit quotas:

| Azure Resource | Free Tier / Cheapest Option | Est. Monthly Cost | Notes |
|---|---|---|---|
| **Azure DevOps Services** | **Free Tier** | **$0.00** | Includes 1 free Microsoft-hosted CI/CD parallel job (1,800 free build minutes/month) for private repos, or unlimited for public repos. |
| **Azure Container Registry (ACR)** | **Basic SKU** | ~$0.16 / day (~$5.00 / month) | ACR has no 100% permanent free tier, but the **Basic SKU** costs only pennies for internship testing and is covered by the $200 free trial credits. |
| **Azure App Service Plan** | **F1 (Free)** or **B1 (Basic)** | **$0.00** on F1 / ~$13/mo on B1 | F1 tier allows basic Linux/Windows code. For Custom Docker Containers, Azure requires at least **B1 (Basic)** (~$0.018/hr) or **F1** depending on region. Use B1 while testing, then delete or scale down. |
| **Bandwidth (Egress)** | First 5 GB / month | **$0.00** | Free tier includes first 5 GB outbound data. |

### How to Check Costs in Azure Before & During the Project:
1. Open the [Azure Portal](https://portal.azure.com/).
2. Type **Cost Management + Billing** in the search bar.
3. Click **Cost analysis** to see live day-by-day expenditure.
4. Set a **Budget Alert** ($5 limit) to receive an email alert if spending ever exceeds $5.

---

## ⚙️ Prerequisites
Ensure you have the following installed on your local computer:
- **Node.js (v18 or v20)**: Run `node -v`
- **Git**: Run `git --version`
- **Docker Desktop** (optional for local container testing): Run `docker --version`
- **GitHub Account**: [github.com](https://github.com)
- **Azure Account**: [azure.microsoft.com/free](https://azure.microsoft.com/free) (comes with $200 free credit or Azure for Students with $100 free credit without credit card)
- **Azure DevOps Account**: [dev.azure.com](https://dev.azure.com) (free signup)

---

## 🧪 Local Setup & Testing

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Automated Tests
```bash
npm test
```
*Expected Result:* All 4 test suites pass (`GET /health`, `GET /api/info`, `GET /`, and `404 handler`), and test results are generated in `./test-results/junit.xml`.

### 3. Run Web App Locally
```bash
npm start
```
Open your browser at `http://localhost:3000` to preview the interactive interface.

### 4. (Optional) Test Docker Build Locally
```bash
docker build -t codealpha-web-app:local .
docker run -p 8080:80 codealpha-web-app:local
```
Open `http://localhost:8080`.

---

## ☁️ Azure Infrastructure Setup (Step-by-Step)

You can create these resources via the **Azure Portal UI** or using the **Azure CLI / Cloud Shell**.

### Step 1: Create a Resource Group
A Resource Group holds all project resources together so you can easily delete them in one click after your internship task is complete.
- **Name:** `rg-codealpha-devops`
- **Region:** Choose a region close to you (e.g., `East US`, `Central US`, or `West Europe`).

*Azure CLI command:*
```bash
az group create --name rg-codealpha-devops --location eastus
```

---

### Step 2: Create Azure Container Registry (ACR)
- In the Azure Portal search bar, search for **Container registries** and click **Create**.
- **Resource Group:** Select `rg-codealpha-devops`.
- **Registry Name:** Enter a globally unique name in lowercase letters/numbers (e.g., `acrdevopsalpha123`).
- **Location:** Same as Resource Group (`East US`).
- **SKU:** Select **Basic** (cheapest, cost-effective).
- Click **Review + create**, then click **Create**.
- Once deployed, go to the registry -> Click **Access keys** under Settings -> Toggle **Admin user** to **Enabled** (this creates username and password credentials for easy service connection).

*Azure CLI command:*
```bash
az acr create --resource-group rg-codealpha-devops --name acrdevopsalpha123 --sku Basic --admin-enabled true
```

---

### Step 3: Create Azure App Service (Web App for Containers)
- In the Azure Portal search bar, search for **App Services** and click **Create** -> **Web App**.
- **Basics:**
  - **Resource Group:** `rg-codealpha-devops`
  - **Name:** A globally unique name (e.g., `codealpha-task1-app-123`).
  - **Publish:** Select **Container**.
  - **Operating System:** Select **Linux**.
  - **Region:** Same as Resource Group (`East US`).
  - **Pricing Plan:** Select **Linux Plan** -> Pricing plan size: **Basic B1** (or Free F1 if container is supported in your region).
- **Container Tab:**
  - **Image Source:** Azure Container Registry
  - **Registry:** Select `acrdevopsalpha123`
  - **Image:** `codealpha-web-app` (if image is not pushed yet, select "Quickstart" or any default image; the pipeline will overwrite it automatically on first deployment).
- Click **Review + Create**, then **Create**.
- Once created, go to the App Service -> **Configuration** (or **Environment variables**) -> Add:
  - Name: `WEBSITES_PORT`
  - Value: `80`
  *(This instructs Azure App Service to route HTTP traffic to container port 80).*

---

## 🔄 Azure DevOps Configuration

### Step 1: Create an Azure DevOps Project
1. Go to [https://dev.azure.com](https://dev.azure.com) and log in.
2. Click **+ New Project**.
3. **Project Name:** `CodeAlpha-DevOps-Task1`.
4. **Visibility:** Public or Private.
5. Click **Create**.

---

### Step 2: Connect Source Code (GitHub / Azure Repos)
You can use either GitHub or Azure Repos:
#### Option A: Using GitHub (Recommended)
1. Push this project code to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for CodeAlpha Task 1 CI/CD"
   git branch -M main
   git remote add origin https://github.com/<your-username>/codealpha-devops-task1.git
   git push -u origin main
   ```
2. In Azure DevOps, go to **Pipelines** -> **Create Pipeline** -> Select **GitHub** -> Authorize Azure Pipelines and select your repository.

#### Option B: Using Azure Repos
1. In Azure DevOps, go to **Repos** -> Copy the git clone/push URL.
2. Push your code directly to Azure Repos:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for CodeAlpha Task 1 CI/CD"
   git branch -M main
   git remote add origin https://<org>@dev.azure.com/<org>/CodeAlpha-DevOps-Task1/_git/CodeAlpha-DevOps-Task1
   git push -u origin main
   ```

---

### Step 3: Create Azure DevOps Service Connections
Azure Pipelines needs permission to push images to ACR and deploy to App Service.

1. In your Azure DevOps project, click **Project settings** (bottom left corner).
2. Click **Service connections** under the *Pipelines* menu.
3. Click **New service connection**:

#### Connection 1: Azure Container Registry (Docker Registry)
- Select **Docker Registry** -> Click **Next**.
- Registry type: **Azure Container Registry**.
- Subscription: Select your Azure Subscription.
- Azure container registry: Select `acrdevopsalpha123`.
- Service connection name: `acrServiceConnection` *(Must match the variable in `azure-pipelines.yml`)*.
- Check **Grant access permission to all pipelines**.
- Click **Save**.

#### Connection 2: Azure Resource Manager (App Service Deploy)
- Click **New service connection** -> Select **Azure Resource Manager** -> Click **Next**.
- Authentication method: **Service principal (automatic)** -> Click **Next**.
- Scope level: **Subscription**.
- Select your Subscription and Resource Group (`rg-codealpha-devops`).
- Service connection name: `azureServiceConnection` *(Must match the variable in `azure-pipelines.yml`)*.
- Check **Grant access permission to all pipelines**.
- Click **Save**.

---

### Step 4: Configure & Run the Pipeline
1. In `azure-pipelines.yml`, update lines 24 to 34 with your exact resource names:
   ```yaml
   variables:
     dockerRegistryServiceConnection: 'acrServiceConnection'
     azureSubscriptionServiceConnection: 'azureServiceConnection'
     containerRegistry: 'acrdevopsalpha123.azurecr.io' # Replace with your ACR login server
     imageRepository: 'codealpha-web-app'
     webAppName: 'codealpha-task1-app-123'              # Replace with your App Service name
   ```
2. In Azure DevOps -> **Pipelines** -> **New Pipeline** -> Select **Existing Azure Pipelines YAML file** -> Select path `/azure-pipelines.yml`.
3. Click **Run**.

---

## 🎯 Verification & Automatic Triggers

### 1. View Pipeline Progress
- Navigate to **Azure DevOps -> Pipelines**.
- You will see 3 distinct stages executing in real-time:
  - **Stage 1 (Test):** Installs Node 20, runs Jest unit tests, publishes test tab with green checkmarks.
  - **Stage 2 (Build & Push):** Builds the Docker image and pushes it to Azure Container Registry.
  - **Stage 3 (Deploy):** Deploys the container to Azure App Service.

### 2. Verify Container in ACR
- Open Azure Portal -> Go to `acrdevopsalpha123` -> Click **Repositories** under *Services*.
- You will see `codealpha-web-app` with your Build ID tag and `latest` tag!

### 3. Verify Live Web Application
- Open Azure Portal -> Go to your App Service (`codealpha-task1-app-123`).
- Click the **Default domain** URL (e.g., `https://codealpha-task1-app-123.azurewebsites.net`).
- You will see the live application dashboard displaying telemetry and green health status!
- Visit `https://codealpha-task1-app-123.azurewebsites.net/health` to verify the JSON health probe response.

### 4. Test Automatic Trigger (CI/CD Proof)
1. Make a small edit to `public/index.html` (for example, change the title or add your name).
2. Commit and push the change to `main`:
   ```bash
   git commit -am "test: verify automated CI/CD deployment trigger"
   git push origin main
   ```
3. Immediately refresh Azure Pipelines — notice that a **new pipeline run was automatically triggered** by the commit!
4. Once completed, refresh your live website to confirm the changes deployed automatically without manual intervention.

---

## 🔍 Monitoring, Logs & Troubleshooting

### How to Check Logs in Azure Pipelines:
1. Go to **Pipelines** -> Click on your active or completed build.
2. Click on any job (e.g., `Run Unit & Integration Tests` or `Deploy Container to Azure App Service`).
3. Click individual step names to see live stdout/stderr console logs.

### How to Check Live Container Logs in Azure App Service:
1. Open the Azure Portal -> Go to your App Service.
2. Under **Monitoring**, click **Log stream**.
3. You will see real-time container startup logs:
   - `docker pull <acr-name>.azurecr.io/codealpha-web-app:<tag>`
   - `CodeAlpha DevOps Task 1 Web App Running on port 80`
   - `Container is healthy and responding on /health`

### Common Errors & Quick Fixes:
| Issue / Error | Root Cause | Solution |
|---|---|---|
| **Pipeline fails: "No hosted parallelism has been purchased or granted"** | New Azure DevOps organizations require filling out Microsoft's free tier request form or using a self-hosted agent. | Submit the [Azure DevOps Free Grant Form](https://aka.ms/azpipelines-parallelism-request) (usually approved in 24-48 hrs), OR run a quick Self-Hosted agent on your computer in 3 minutes! |
| **App Service shows "Application Error :(" / Container won't start** | Port mismatch. Azure App Service sends traffic to port 80 by default. | In App Service -> **Configuration** -> Add Application Setting: `WEBSITES_PORT = 80`. Save and restart. |
| **ACR Push: "unauthorized: authentication required"** | Service connection lacks permission to ACR. | Enable **Admin user** in ACR Access Keys, or re-create the `acrServiceConnection` with full subscription access. |
| **Jest test failure fails the entire pipeline** | Quality gate working as intended! A broken test stops bad code from reaching production. | Run `npm test` locally, fix the breaking code, commit, and re-push. |

---

## 📸 Internship Report Screenshot Checklist

To earn maximum marks from your CodeAlpha evaluator, capture and include these screenshots in your final PDF report:

1. **Local Test Success:** Screenshot of terminal showing `npm test` with 4 passed Jest unit tests.
2. **Azure Resources in Portal:** Screenshot of Azure Portal showing your Resource Group containing ACR and App Service.
3. **Azure Container Registry (ACR) Repositories:** Screenshot showing the `codealpha-web-app` repository with build tags in the Azure Portal.
4. **Azure DevOps Pipeline Run:** Screenshot showing the pipeline summary with all 3 stages (**Test**, **BuildAndPush**, **Deploy**) marked with green checkmarks.
5. **Azure DevOps Tests Tab:** Screenshot of the **Tests** tab in the pipeline run showing `100% passed` (4 tests).
6. **Live Web App Deployed:** Screenshot of your live browser URL (`https://<app-name>.azurewebsites.net`) showing the interactive web interface.
7. **Live Health Check:** Screenshot of `https://<app-name>.azurewebsites.net/health` showing JSON `{ "status": "UP" }`.
8. **Automatic Trigger Evidence:** Screenshot of git commit log matching the Azure DevOps pipeline build trigger.

---

## 🎙️ Video Presentation Script

Use this simple, 2-minute script if CodeAlpha asks for a video demonstration or LinkedIn presentation:

> **"Hello everyone! My name is [Your Name], and this is my presentation for CodeAlpha DevOps Internship Task 1: Automated CI/CD Pipeline using Azure DevOps.**
>
> **The goal of this task is to automate the entire software delivery lifecycle from code commit to cloud deployment.**
>
> **Here is how the architecture works:**
> 1. **Web Application:** I developed a lightweight Node.js Express web application equipped with automated unit tests using Jest and health check probes.
> 2. **Containerization:** Using Docker, I packaged the application into a minimal Alpine Linux container configured for production security.
> 3. **Continuous Integration (CI):** Through an `azure-pipelines.yml` configuration, every commit to the main branch triggers automated quality gates that run tests and generate JUnit reports.
> 4. **Azure Container Registry (ACR):** When tests pass, Azure Pipelines automatically builds and pushes the container image tagged with the unique build ID to Azure Container Registry.
> 5. **Continuous Deployment (CD):** The pipeline then connects to Azure App Service via an automated Azure Resource Manager service connection and deploys the new container with zero downtime.
>
> **[Demonstration]:** As you can see on screen, here is our Azure DevOps pipeline running with all 3 stages passing. And here is our live public URL on Azure App Service displaying our interactive dashboard and `/health` telemetry endpoint.
>
> **Thank you CodeAlpha for this learning opportunity!"**

---

## 🧹 Clean Up / Deleting Azure Resources (Save Money)

After completing your task and taking screenshots, delete the resource group to make sure you are never charged:

```bash
az group delete --name rg-codealpha-devops --yes --no-wait
```
Or in the **Azure Portal**:
1. Open **Resource Groups**.
2. Click **rg-codealpha-devops**.
3. Click **Delete resource group** at the top bar.
4. Type the name to confirm and click **Delete**.
