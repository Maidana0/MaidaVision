import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Inicializar Redis + Ratelimit
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(15, "10 s"),
  // 15 requests cada 10 segundos por IP
  analytics: true,
});