class system::default {
	
	include system

	exec {
		"makecache":
			unless => "/usr/bin/ls /tmp/cache.done | grep cache.done ",
			command => "/usr/bin/yum makecache fast && /usr/bin/touch /tmp/cache.done",
	}

	exec {
		"install-epel":
			unless => "/usr/bin/rpm -qa | /usr/bin/grep epel",
			command => "/usr/bin/rpm -Uvh https://dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-7-5.noarch.rpm",
			require => Exec["makecache"],
	}

	exec {
		["disable-firewall"]:
			unless 	=> "/usr/bin/systemctl status firewalld   | grep -i dead",
			command => "/usr/bin/systemctl disable firewalld && /usr/bin/systemctl stop firewalld",
	}

	package { 
		["sysstat","ntpdate","net-tools","wget","git","samba"]:
			ensure => installed,
			require => Exec["makecache"],
			allow_virtual => false,
	}

	package {
		["vim-enhanced","glances","links"]:
			ensure => installed,
			require => Exec["install-epel"],
			allow_virtual => false,
	}

	package { 
		"cifs-utils":
			ensure => installed,
			require => Package["samba"],
			allow_virtual => false,
	}

}