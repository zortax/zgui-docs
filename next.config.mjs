import { createMDX } from 'fumadocs-mdx/next';
import { networkInterfaces } from 'node:os';

const withMDX = createMDX();

function getLocalDevOrigins() {
  try {
    return Object.values(networkInterfaces())
      .flatMap((addresses) => addresses ?? [])
      .filter((address) => !address.internal)
      .map((address) =>
        address.family === 'IPv6' ? `[${address.address}]` : address.address,
      );
  } catch {
    // Some sandboxed build environments don't permit network-interface access.
    return [];
  }
}

/** @type {import('next').NextConfig} */
const config = {
  // Emit `.next/standalone`, a self-contained server bundle the Docker image
  // runs directly instead of shipping the whole node_modules tree.
  output: 'standalone',
  reactStrictMode: true,
  // Next blocks its dev-only scripts and HMR connection when the page is opened
  // through a hostname other than localhost. Allow this machine's LAN addresses
  // so client components (search, the mobile drawer, etc.) can hydrate on phones.
  allowedDevOrigins: getLocalDevOrigins(),
};

export default withMDX(config);
