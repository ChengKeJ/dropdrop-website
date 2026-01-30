
import { motion } from "framer-motion";
import { BlogPost } from "@/lib/blog";
import { Link } from "wouter";
import { Clock, Calendar } from "lucide-react";

interface RelatedPostsProps {
    posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
    if (!posts || posts.length === 0) return null;

    return (
        <div className="mt-20 border-t border-gray-100 pt-16">
            <h3 className="text-xl font-bold text-[#111] mb-8 tracking-tight">
                Related Articles
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                    >
                        <Link href={`/blog/${post.slug}`} className="block h-full">
                            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-4 bg-gray-100 border border-gray-100">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#4CAF93] uppercase tracking-wider shadow-sm">
                                    {post.category}
                                </div>
                            </div>

                            <h4 className="text-lg font-bold text-[#222] mb-3 leading-snug group-hover:text-[#4CAF93] transition-colors">
                                {post.title}
                            </h4>

                            <div className="flex items-center gap-4 text-xs text-[#888] font-medium">
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={12} />
                                    {new Date(post.datePublished).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock size={12} />
                                    {post.readTime} min
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
