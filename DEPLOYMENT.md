# Deployment Guide - Terminal Bird

This guide covers deploying the Terminal Bird portfolio website to GitHub Pages.

## Prerequisites

- GitHub account
- Repository with the project code
- Node.js 18+ installed locally

## GitHub Pages Deployment

### Initial Setup

1. **Enable GitHub Pages**

   ```bash
   # Go to repository Settings → Pages
   # Source: GitHub Actions
   ```

2. **Configure Environment Variables**

   ```bash
   # Go to Settings → Secrets and variables → Actions → Variables
   # Add repository variables:
   NEXT_PUBLIC_SITE_URL=https://yourusername.github.io/repository-name
   NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
   ```

3. **Update Site Configuration**
   ```bash
   # Create .env.local for local development
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

### Deployment Process

The site automatically deploys when you push to the `main` branch.

**Workflow:**

1. Push code to `main` branch
2. GitHub Actions runs CI checks (lint, test, build)
3. If checks pass, deploys to GitHub Pages
4. Site available at your GitHub Pages URL

**Manual Deployment:**

```bash
# Trigger deployment manually
# Go to Actions → Deploy Next.js site to Pages → Run workflow
```

### Build Process

```bash
# Local build test
npm run build

# Analyze bundle size
npm run analyze

# Test production build locally
npm run build && npm run start
```

## Environment Configuration

### Required Variables

```bash
# .env.local (local development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_VERIFICATION=

# GitHub Actions Variables (production)
NEXT_PUBLIC_SITE_URL=https://yourusername.github.io/repo
NEXT_PUBLIC_GOOGLE_VERIFICATION=actual-code
```

### Optional Variables

```bash
# Future analytics integration
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Environment variables configured
- [ ] Content validated (no broken links)
- [ ] Images optimized
- [ ] RSS feed tested (`/rss.xml`)
- [ ] Sitemap verified (`/sitemap.xml`)

### Post-Deployment

- [ ] Site loads correctly
- [ ] Navigation works
- [ ] Articles display properly
- [ ] RSS feed accessible
- [ ] Mobile responsive
- [ ] Performance check (Lighthouse)
- [ ] Accessibility check (Lighthouse)
- [ ] SEO check (Google Search Console)

## Troubleshooting

### Build Fails

```bash
# Check build logs in GitHub Actions
# Common issues:
# 1. TypeScript errors
npm run build  # Test locally

# 2. Missing environment variables
# Check GitHub repository variables

# 3. Content validation errors
# Check article frontmatter
```

### Site Not Updating

```bash
# 1. Check GitHub Actions status
# Go to Actions tab → View latest workflow

# 2. Clear GitHub Pages cache
# Settings → Pages → Redeploy

# 3. Hard refresh browser
# Ctrl+Shift+R (Windows/Linux)
# Cmd+Shift+R (Mac)
```

### 404 Errors

```bash
# GitHub Pages serves from /out directory
# Ensure next.config.js has correct output settings
# Static export should work automatically
```

## Rollback Procedure

### Quick Rollback

```bash
# 1. Revert to previous commit
git revert HEAD
git push origin main

# 2. Or revert to specific commit
git revert <commit-hash>
git push origin main
```

### Manual Rollback

```bash
# 1. Checkout previous working version
git checkout <previous-commit>

# 2. Create new branch
git checkout -b rollback-fix

# 3. Push and merge
git push origin rollback-fix
# Create PR and merge to main
```

## Performance Optimization

### Before Deployment

```bash
# 1. Analyze bundle size
npm run analyze

# 2. Check for large dependencies
# Review .next/analyze/client.html

# 3. Optimize images
# Use Next.js Image component
# Convert to WebP/AVIF

# 4. Run Lighthouse
# Check performance score
```

### Monitoring

```bash
# Web Vitals tracked automatically
# View in browser console (development)
# Send to Google Analytics (production)

# Key metrics:
# - LCP (Largest Contentful Paint) < 2.5s
# - FID (First Input Delay) < 100ms
# - CLS (Cumulative Layout Shift) < 0.1
```

## CI/CD Pipeline

### Workflows

**CI Workflow** (`.github/workflows/ci.yml`)

- Runs on: Pull requests, pushes to main/develop
- Jobs: lint → test → build
- Blocks merge if fails

**Deploy Workflow** (`.github/workflows/nextjs.yml`)

- Runs on: Push to main
- Jobs: lint → test → build → deploy
- Deploys to GitHub Pages

### Adding Checks

```yaml
# Add to .github/workflows/ci.yml
- name: Lighthouse CI
  run: npm run lighthouse

- name: Bundle size check
  run: npm run analyze
```

## Custom Domain (Optional)

### Setup

1. **Add CNAME file**

   ```bash
   # public/CNAME
   yourdomain.com
   ```

2. **Configure DNS**

   ```
   # Add A records:
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153

   # Or CNAME:
   yourusername.github.io
   ```

3. **Update Environment**

   ```bash
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

4. **Enable HTTPS**
   ```bash
   # Settings → Pages → Enforce HTTPS
   ```

## Monitoring & Maintenance

### Regular Checks

- **Weekly:** Check GitHub Actions status
- **Monthly:** Review Web Vitals metrics
- **Quarterly:** Update dependencies
- **Yearly:** Review and update content

### Dependency Updates

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Test after updates
npm run test
npm run build
```

## Support

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Project Documentation](./docs/README.md)

### Common Issues

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed solutions.

---

**Last Updated:** March 5, 2026  
**Deployment Platform:** GitHub Pages  
**Framework:** Next.js 14.2
