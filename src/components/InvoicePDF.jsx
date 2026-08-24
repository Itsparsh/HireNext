import React from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Path, Rect } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 0,
    fontFamily: 'Helvetica',
  },
  header: {
    backgroundColor: '#0F172A',
    padding: 40,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandName: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Helvetica-Bold',
    marginLeft: 12,
    letterSpacing: -0.5,
  },
  companyDetails: {
    color: '#94A3B8',
    fontSize: 10,
    lineHeight: 1.5,
  },
  invoiceTitle: {
    fontSize: 36,
    color: '#FFFFFF',
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
    letterSpacing: -1,
    marginBottom: 10,
  },
  invoiceMeta: {
    color: '#94A3B8',
    fontSize: 10,
    textAlign: 'right',
    lineHeight: 1.5,
  },
  statusBadge: {
    backgroundColor: '#10B981',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  content: {
    padding: 40,
    flex: 1,
  },
  billToSection: {
    marginBottom: 40,
  },
  billToLabel: {
    fontSize: 10,
    color: '#64748B',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  billToName: {
    fontSize: 14,
    color: '#0F172A',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  billToDetails: {
    fontSize: 10,
    color: '#475569',
    lineHeight: 1.5,
  },
  table: {
    width: '100%',
    marginBottom: 40,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '2px solid #E2E8F0',
    paddingBottom: 12,
    marginBottom: 12,
  },
  thDescription: { flex: 3, fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#64748B', textTransform: 'uppercase' },
  thPeriod: { flex: 2, fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#64748B', textTransform: 'uppercase' },
  thAmount: { flex: 1, fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#64748B', textTransform: 'uppercase', textAlign: 'right' },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottom: '1px solid #F1F5F9',
  },
  tdDescription: { flex: 3, fontSize: 12, color: '#0F172A', fontFamily: 'Helvetica-Bold' },
  tdPeriod: { flex: 2, fontSize: 10, color: '#475569', paddingTop: 2 },
  tdAmount: { flex: 1, fontSize: 12, color: '#0F172A', fontFamily: 'Helvetica-Bold', textAlign: 'right' },
  totalsSection: {
    width: '40%',
    alignSelf: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  totalValue: {
    fontSize: 10,
    color: '#0F172A',
    fontFamily: 'Helvetica-Bold',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 12,
    borderTop: '2px solid #E2E8F0',
  },
  grandTotalLabel: {
    fontSize: 14,
    color: '#0F172A',
    fontFamily: 'Helvetica-Bold',
  },
  grandTotalValue: {
    fontSize: 18,
    color: '#3B82F6',
    fontFamily: 'Helvetica-Bold',
  },
  footer: {
    padding: 40,
    borderTop: '1px solid #E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 9,
  }
});

// Used for downloading all invoices summary
const AllInvoicesPDF = ({ invoices, formatAmount }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <View style={styles.logoContainer}>
            <Svg width="30" height="30" viewBox="0 0 24 24">
              <Rect x="2" y="2" width="20" height="20" rx="6" fill="#10B981" />
              <Path d="M7 7v10M17 7v10M7 12h10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
            <Text style={styles.brandName}>HireNext</Text>
          </View>
        </View>
        <View>
          <Text style={styles.invoiceTitle}>Billing History</Text>
          <Text style={styles.invoiceMeta}>Generated: {new Date().toLocaleDateString()}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={{flex: 2, fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#64748B'}}>INVOICE ID</Text>
            <Text style={{flex: 2, fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#64748B'}}>DATE</Text>
            <Text style={{flex: 3, fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#64748B'}}>PLAN</Text>
            <Text style={{flex: 1, fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#64748B'}}>STATUS</Text>
            <Text style={{flex: 2, fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#64748B', textAlign: 'right'}}>AMOUNT</Text>
          </View>
          {invoices.map((inv, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={{flex: 2, fontSize: 10, color: '#0F172A', fontFamily: 'Helvetica-Bold'}}>{inv.id}</Text>
              <Text style={{flex: 2, fontSize: 10, color: '#475569'}}>{inv.date}</Text>
              <Text style={{flex: 3, fontSize: 10, color: '#475569'}}>{inv.plan}</Text>
              <Text style={{flex: 1, fontSize: 10, color: '#10B981', fontFamily: 'Helvetica-Bold'}}>{inv.status}</Text>
              <Text style={{flex: 2, fontSize: 10, color: '#0F172A', fontFamily: 'Helvetica-Bold', textAlign: 'right'}}>{formatAmount(inv.amount)}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const InvoicePDF = ({ invoice, formattedAmount, isMultiple, allInvoices, formatAmount }) => {
  if (isMultiple) {
    return <AllInvoicesPDF invoices={allInvoices} formatAmount={formatAmount} />;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Dark Executive Header */}
        <View style={styles.header}>
          <View>
            <View style={styles.logoContainer}>
              <Svg width="40" height="40" viewBox="0 0 24 24">
                <Rect x="2" y="2" width="20" height="20" rx="6" fill="#10B981" />
                <Path d="M7 7v10M17 7v10M7 12h10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
              <Text style={styles.brandName}>HireNext</Text>
            </View>
            <Text style={styles.companyDetails}>HireNext Technologies Inc.</Text>
            <Text style={styles.companyDetails}>123 Innovation Drive, Suite 500</Text>
            <Text style={styles.companyDetails}>San Francisco, CA 94105</Text>
            <Text style={styles.companyDetails}>billing@hirenext.ai</Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceMeta}>Invoice Number: {invoice.id}</Text>
            <Text style={styles.invoiceMeta}>Date of Issue: {invoice.date}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{invoice.status}</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.billToSection}>
            <Text style={styles.billToLabel}>Billed To:</Text>
            <Text style={styles.billToName}>TechNova Solutions</Text>
            <Text style={styles.billToDetails}>Attn: Billing Department</Text>
            <Text style={styles.billToDetails}>456 Enterprise Blvd</Text>
            <Text style={styles.billToDetails}>New York, NY 10001</Text>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.thDescription}>DESCRIPTION</Text>
              <Text style={styles.thPeriod}>SERVICE PERIOD</Text>
              <Text style={styles.thAmount}>AMOUNT</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tdDescription}>{invoice.plan} Subscription</Text>
              <Text style={styles.tdPeriod}>{invoice.date} - Next Billing Cycle</Text>
              <Text style={styles.tdAmount}>{formattedAmount}</Text>
            </View>
          </View>

          <View style={styles.totalsSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>{formattedAmount}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tax (0%)</Text>
              <Text style={styles.totalValue}>$0.00</Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total</Text>
              <Text style={styles.grandTotalValue}>{formattedAmount}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for your business.</Text>
          <Text style={styles.footerText}>HireNext Technologies © {new Date().getFullYear()}</Text>
        </View>

      </Page>
    </Document>
  );
};

export default InvoicePDF;
