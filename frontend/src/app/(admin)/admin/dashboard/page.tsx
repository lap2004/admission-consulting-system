"use client";

import { useGetStats } from "@/src/services/hooks/hookAdmin";
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import {
  BarChart,
  LineChart,
  PieChart,
} from "@mui/x-charts";
import { useEffect, useState } from "react";

interface StatItem {
  date: string;
  count: number;
}

interface TopPage {
  path: string;
  count: number;
}

interface DashboardStats {
  total_users: number;
  total_chats: {
    student: number;
    admission: number;
  };
  total_embeddings: number;
  total_page_views: number;
  embedding_distribution: {
    admissions: number;
    students: number;
    pdfs: number;
  };
  daily_chat_stats: StatItem[];
  user_signup_stats: StatItem[];
  page_view_stats: StatItem[];
  top_pages: TopPage[];
}

const fallbackData: DashboardStats = {
  total_users: 0,
  total_chats: { student: 0, admission: 0 },
  total_embeddings: 0,
  total_page_views: 0,
  embedding_distribution: { admissions: 0, students: 0, pdfs: 0 },
  daily_chat_stats: [],
  user_signup_stats: [],
  page_view_stats: [],
  top_pages: [],
};

export default function AdminDashboardPage() {
  const { getGetStats } = useGetStats();
  const [data, setData] = useState<DashboardStats>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await getGetStats({});
        setData(result);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [getGetStats]);

  if (loading) return <Box p={4}><CircularProgress /></Box>;
  if (error) return <Box p={4}>Lỗi khi tải dữ liệu.</Box>;

  return (
    <Box p={4}>
      <Grid container spacing={3}>
        {[{
          title: "Tổng người dùng", value: data.total_users
        }, {
          title: "Tổng lượt hỏi", value: data.total_chats.student + data.total_chats.admission
        }, {
          title: "Tổng embedding", value: data.total_embeddings
        }, {
          title: "Lượt truy cập", value: data.total_page_views
        }].map((item, idx) => (
          <Grid item xs={12} md={3} key={idx}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {item.title}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Phân loại lượt hỏi</Typography>
            <BarChart
              width={550}
              height={250}
              xAxis={[{ data: ["Student", "Admission"], scaleType: "band" }]}
              series={[{
                data: [data.total_chats.student, data.total_chats.admission],
                label: "Số lượt hỏi"
              }]}
              margin={{ top: 10, bottom: 30 }}
              slotProps={{ legend: undefined }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Phân bổ Embedding</Typography>
            <PieChart
              height={280}
              series={[{
                data: [
                  { value: data.embedding_distribution.admissions, label: "Admissions" },
                  { value: data.embedding_distribution.students, label: "Students" },
                  { value: data.embedding_distribution.pdfs, label: "PDFs" },
                ],
              }]}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Người dùng mới theo ngày</Typography>
            <BarChart
              height={250}
              xAxis={[{ data: data.user_signup_stats.map(u => u.date), scaleType: "band" }]}
              series={[{ data: data.user_signup_stats.map(u => u.count) }]}
              margin={{ top: 10, bottom: 30 }}
              slotProps={{ legend: undefined }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Lượt hỏi mỗi ngày</Typography>
            <LineChart
              height={300}
              series={[{ data: data.daily_chat_stats.map(d => d.count), label: "Lượt hỏi" }]}
              xAxis={[{ data: data.daily_chat_stats.map(d => d.date), scaleType: "point" }]}
              slotProps={{ legend: undefined }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Lượt truy trang mỗi ngày</Typography>
            <LineChart
              height={300}
              series={[{ data: data.page_view_stats.map(p => p.count), label: "Lượt truy cập" }]}
              xAxis={[{ data: data.page_view_stats.map(p => p.date), scaleType: "point" }]}
              slotProps={{ legend: undefined }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2">Top trang được truy nhiều</Typography>
            <BarChart
              height={250}
              xAxis={[{ data: data.top_pages.map(p => p.path), scaleType: "band" }]}
              series={[{ data: data.top_pages.map(p => p.count) }]}
              margin={{ top: 10, bottom: 30 }}
              slotProps={{ legend: undefined }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
