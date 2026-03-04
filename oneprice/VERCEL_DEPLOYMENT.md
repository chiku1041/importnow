# Vercel Deployment Guide

This guide will help you deploy your OnePrice application to Vercel.

## Prerequisites

1. A GitHub, GitLab, or Bitbucket account
2. A Vercel account (sign up at [vercel.com](https://vercel.com))
3. Your Clerk and Supabase credentials ready

## Step 1: Push Code to Git Repository

If you haven't already, initialize a git repository and push your code:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ready for deployment"

# Add your remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/oneprice.git

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign in or create an account

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Import your Git repository (GitHub/GitLab/Bitbucket)
   - Select your `oneprice` repository

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Add Environment Variables**
   
   Click "Environment Variables" and add the following:

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

   **Important**: 
   - Replace all placeholder values with your actual credentials
   - Make sure to add these for all environments (Production, Preview, Development)

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)
   - Your app will be live at `https://your-project-name.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project or create new
   - Add environment variables when prompted

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Step 3: Configure Clerk for Production

1. **Go to Clerk Dashboard**
   - Visit [dashboard.clerk.com](https://dashboard.clerk.com)
   - Select your application

2. **Update Allowed Origins**
   - Go to **Settings** → **Domains**
   - Add your Vercel domain: `https://your-project-name.vercel.app`
   - Add your custom domain (if you have one)

3. **Update Redirect URLs**
   - Go to **Settings** → **Paths**
   - Add your production URLs:
     - After sign-in: `https://your-project-name.vercel.app/dashboard`
     - After sign-up: `https://your-project-name.vercel.app/dashboard`

## Step 4: Configure Supabase (if needed)

1. **Update Supabase Settings**
   - Go to your Supabase Dashboard
   - **Settings** → **API**
   - Ensure your project URL and keys are correct

2. **Update RLS Policies** (if needed)
   - Make sure your Row Level Security policies are set up correctly
   - Test that authenticated users can access their data

## Step 5: Set Up Custom Domain (Optional)

1. **In Vercel Dashboard**
   - Go to your project → **Settings** → **Domains**
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Clerk**
   - Add your custom domain to Clerk's allowed origins

## Step 6: Verify Deployment

1. **Test Your Application**
   - Visit your Vercel URL
   - Test sign-up/sign-in flow
   - Test order creation and tracking
   - Verify all pages load correctly

2. **Check Build Logs**
   - In Vercel Dashboard → **Deployments**
   - Check for any build errors or warnings

## Troubleshooting

### Build Fails

- **Check Environment Variables**: Ensure all required env vars are set
- **Check Build Logs**: Look for specific error messages
- **Test Local Build**: Run `npm run build` locally to catch issues

### Authentication Issues

- **Verify Clerk Keys**: Ensure Clerk keys are correct
- **Check Allowed Origins**: Verify your Vercel domain is in Clerk's allowed origins
- **Check Redirect URLs**: Ensure redirect URLs match your Vercel domain

### Database Connection Issues

- **Verify Supabase URL**: Check that `NEXT_PUBLIC_SUPABASE_URL` is correct
- **Check API Keys**: Ensure Supabase keys are correct
- **Test RLS Policies**: Verify Row Level Security policies allow access

### Environment Variables Not Working

- **Redeploy**: After adding/changing env vars, redeploy your application
- **Check Variable Names**: Ensure variable names match exactly (case-sensitive)
- **Restart Build**: Sometimes a fresh deployment is needed

## Continuous Deployment

Vercel automatically deploys when you push to your main branch:
- **Production**: Deploys from `main` or `master` branch
- **Preview**: Deploys from other branches and pull requests

## Monitoring

- **Analytics**: Enable Vercel Analytics in project settings
- **Logs**: Check function logs in Vercel Dashboard
- **Performance**: Monitor Core Web Vitals in Vercel Dashboard

## Support

For issues:
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)

---

**Your app is now live! 🎉**



