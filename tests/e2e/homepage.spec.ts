/**
 * Homepage E2E Tests
 * Tests for the NestLancer homepage functionality
 */

import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')

    // Check page title
    await expect(page).toHaveTitle(/NestLancer/)

    // Check main heading
    await expect(page.locator('h1')).toContainText(/NestLancer/)

    // Check navigation links
    await expect(page.locator('a[href="/auth/login"]')).toBeVisible()
    await expect(page.locator('a[href="/auth/register"]')).toBeVisible()
  })

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/')

    // Click login button
    await page.click('a[href="/auth/login"]')

    // Should be on login page
    await expect(page).toHaveURL(/.*auth\/login/)
    await expect(page.locator('h1, h2, h3')).toContainText(/sign in|login/i)
  })

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/')

    // Click register button
    await page.click('a[href="/auth/register"]')

    // Should be on register page
    await expect(page).toHaveURL(/.*auth\/register/)
    await expect(page.locator('h1, h2, h3')).toContainText(/sign up|register/i)
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Check that content is visible on mobile
    await expect(page.locator('h1')).toBeVisible()

    // Check mobile navigation
    await expect(page.locator('a[href="/auth/login"]')).toBeVisible()
  })
})
