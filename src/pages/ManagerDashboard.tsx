
import { useArtist } from '@/contexts/ArtistContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, FileText, Calendar, TrendingUp, Mail, MapPin, DollarSign } from 'lucide-react';

const ManagerDashboard = () => {
  const { submissions, artists } = useArtist();

  const stats = [
    {
      title: 'Total Artists',
      value: artists.length,
      icon: Users,
      description: 'Active performers',
      color: 'text-blue-600'
    },
    {
      title: 'New Applications',
      value: submissions.length,
      icon: FileText,
      description: 'Pending review',
      color: 'text-purple-600'
    },
    {
      title: 'This Month',
      value: submissions.filter(sub => {
        const submittedDate = new Date(sub.submittedAt);
        const now = new Date();
        return submittedDate.getMonth() === now.getMonth() && submittedDate.getFullYear() === now.getFullYear();
      }).length,
      icon: Calendar,
      description: 'Applications',
      color: 'text-green-600'
    },
    {
      title: 'Avg. Rate',
      value: `$${Math.round(artists.reduce((sum, artist) => sum + artist.price, 0) / artists.length || 0)}`,
      icon: TrendingUp,
      description: 'Per event',
      color: 'text-orange-600'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Manager Dashboard</h1>
          <p className="text-xl text-slate-600">Manage artists and review applications</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                    <p className="text-sm text-slate-500">{stat.description}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-slate-100 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Applications Table */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Recent Applications</CardTitle>
            <CardDescription>
              Review and manage artist applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submissions.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">No applications yet</h3>
                <p className="text-slate-500">New artist applications will appear here</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Artist</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id} className="hover:bg-slate-50">
                        <TableCell>
                          <div>
                            <div className="font-medium text-slate-800">{submission.name}</div>
                            <div className="flex items-center text-sm text-slate-500 mt-1">
                              <Mail className="w-3 h-3 mr-1" />
                              {submission.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{submission.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-slate-600">
                            <MapPin className="w-3 h-3 mr-1" />
                            {submission.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm font-medium text-slate-800">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {submission.price}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {submission.skills.slice(0, 2).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {submission.skills.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{submission.skills.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-500">
                          {formatDate(submission.submittedAt)}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline">
                              Review
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboard;
